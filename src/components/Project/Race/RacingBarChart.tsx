import { useRef, useEffect, MutableRefObject } from 'react';
import { select, scaleBand, scaleLinear, max } from 'd3';
import useResizeObserver from '../../../hooks/race/useResizeObserver';

type Props = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

const RacingBarChart: React.FC<Props> = ({
  data,
}: Props) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef: MutableRefObject<
    HTMLDivElement | undefined
  > = useRef<HTMLDivElement>();
  const dimensions: DOMRectReadOnly | null =
    useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (dimensions) {
      // sorting the data
      data.sort((a, b) => b.value - a.value);

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(
          data.map((value, index) => index.toString())
        ) // [0,1,2,3,4,5]
        .range([0, dimensions.height]); // [0, 200]

      const xScale = scaleLinear()
        .domain([0, max(data, (entry) => entry.value)]) // [0, 65 (example)]
        .range([0, dimensions.width]); // [0, 400 (example)]

      // draw the bars
      svg
        .selectAll<SVGRectElement, unknown>('.bar')
        .data(data, (entry) => entry.name)
        .join((enter) =>
          enter
            .append('rect')
            .attr('y', (entry, index) => yScale(index))
        )
        .attr('fill', (entry) => entry.color)
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('height', yScale.bandwidth())
        .transition()
        .attr('width', (entry) => xScale(entry.value))
        .attr('y', (entry, index) => yScale(index));

      // draw the labels
      svg
        .selectAll<SVGTextElement, unknown>('.label')
        .data(data, (entry) => entry.name)
        .join((enter) =>
          enter
            .append('text')
            .attr(
              'y',
              (entry, index) =>
                yScale(index) + yScale.bandwidth() / 2 + 5
            )
        )
        .text(
          (entry) =>
            `🐎 ... ${entry.name} (${entry.value} meters)`
        )
        .attr('class', 'label')
        .attr('x', 10)
        .transition()
        .attr(
          'y',
          (entry, index) =>
            yScale(index) + yScale.bandwidth() / 2 + 5
        );
    }
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RacingBarChart;
