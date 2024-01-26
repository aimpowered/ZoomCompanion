"use client";

import React, { MouseEvent } from 'react';
import PropTypes from 'prop-types';

interface TabProps {
  activeTab: string;
  label: string;
  onClick: (label: string) => void;
}

class Tab extends React.Component<TabProps> {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const { onClick, props: { activeTab, label } } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    return (
      <li className={className} onClick={onClick}>
        {label}
      </li>
    );
  }
}

export default Tab;
