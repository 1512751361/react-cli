import React from 'react';
import { shallow, configure, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '@page/index/components/App';
import AddTodo from '@page/index/containers/AddTodo';
import Footer from '@page/index/components/Footer';
import VisibleTodoList from '@page/index/containers/VisibleTodoList';

configure({ adapter: new Adapter() });

const setup = () => {
  // 模拟 props
  const props = {};

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const sWrapper = shallow(<App {...props} />)

  return {
    props,
    sWrapper,
  };
};

describe('App components', () => {
  const { sWrapper } = setup();

  it("get child component AddTodo length", () => {
    expect(sWrapper.find(AddTodo).length).toBe(1)
  })

  it("VisibleTodoList component shuld be render", () => {
    expect(sWrapper.find(VisibleTodoList).exists());
  })

  it("VisibleTodoList component shuld be render", () => {
    expect(sWrapper.find(Footer).exists());
  })
});

