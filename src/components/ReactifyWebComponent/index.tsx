import React, { forwardRef } from 'react';

const reactifyWebComponent = <WebComponentProps,>(WebComponentName: string) => {
  type ReactWebComponentProps = React.HTMLProps<HTMLElement> &
    WebComponentProps;

  return forwardRef<HTMLElement, ReactWebComponentProps>((props, parentRef) => (
    <WebComponentName ref={parentRef} {...(props as ReactWebComponentProps)} />
  ));
};

export default reactifyWebComponent;
