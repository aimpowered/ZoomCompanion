import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

interface TabsProps {
  children: ReactNode;
}

interface TabsState {
  activeTab: string;
}

type TabElement = React.ReactElement<React.ComponentProps<typeof Tab>>;


class Tabs extends Component<TabsProps, TabsState> {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      activeTab: (props.children as TabElement[])[1].props.label,
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
            if ((child as TabElement).props.label !== activeTab) return null;
            return (child as TabElement).props.children;
          })}
        </div>

        <ol className="tab-list">
          {React.Children.map(children, (child) => {
            const { label } = (child as React.ReactElement<{ label: string }>).props;

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
