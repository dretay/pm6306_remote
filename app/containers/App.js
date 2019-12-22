// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;
  componentDidMount() {
  }
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
