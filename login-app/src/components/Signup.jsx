import React, { Component }  from 'react';

class Signup extends Component {
    state = {
        number: 0
      }
    
      constructor(props) {
        super(props);
        console.log('constructor');
      }
      //  컴포넌트가 화면에 나타나게 됐을 때 호출
      componentDidMount() {
        console.log('componentDidMount');
      }
      //Virtual DOM 에 리렌더링
      shouldComponentUpdate(nextProps, nextState) {
        // 5 의 배수라면 리렌더링 하지 않음
        console.log('shouldComponentUpdate');
        if (nextState.number % 5 === 0) return false;
        return true;
      }

      // shouldComponentUpdate 에서 true 를 반환했을때만 호출
      componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
      }
      
      componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
      }
      
    
      handleIncrease = () => {
        const { number } = this.state;
        this.setState({
          number: number + 1
        });
      }
    
      handleDecrease = () => {
        this.setState(
          ({ number }) => ({
            number: number - 1
          })
        );
      }
      
      render() {
        console.log('render');
        return (
          <div>
            <h1>카운터</h1>
            <div>값: {this.state.number}</div>
            <button onClick={this.handleIncrease}>+</button>
            <button onClick={this.handleDecrease}>-</button>
          </div>
        );
      }
}


export default Signup;