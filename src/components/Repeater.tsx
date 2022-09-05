import React, { PropsWithChildren } from 'react';

interface IRepeaterProps extends PropsWithChildren {
  times: number;
}

export default function Repeater({ children, times }: IRepeaterProps): JSX.Element {
  return (
    <>
      {Array(times)
        .fill(children)
        .map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
    </>
  );
}
