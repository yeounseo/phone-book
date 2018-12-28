import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';
import PhoneInfo from './components/PhoneInfo';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '여운서',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }
  // 우리 App 에서 handleCreate 라는 메소드를 만들고,
  // 이를 PhoneForm 한테 전달해주자, 
  // 그리고 PhoneForm 쪽에서 버튼을 만들어,
  // submit이 발생하면 props로 받은 함수를 호출하여
  // App에 파라미터로 받은 값을 사용할 수 있도록 하자
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data }  //새 객체를 만들어서 기존의 값과 전달받은 data을 덮어씀
          : info // 기존의 값을 그대로 유지
      )
    })
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
