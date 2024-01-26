import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

interface TabsProps {
  children: ReactNode;
}

interface TabsState {
  activeTab: string;
}

class Tabs extends Component<TabsProps, TabsState> {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      activeTab: (props.children as React.ReactElement<any>[])[0].props.label,
    };
  }

  onClickTabItem = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className="tabs">
        <div className="tab-content">
          {React.Children.map(children, (child) => {
            if ((child as React.ReactElement<any>).props.label !== activeTab) return null;
            return (child as React.ReactElement<any>).props.children;
          })}
        </div>
        
        <ol className="tab-list">
          {React.Children.map(children, (child) => {
            const { label } = (child as React.ReactElement<any>).props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        
      </div>
    );
  }
}

export default Tabs;
