import React from 'react';
import './App.css';
import plus from './plus.png';
import Modal from './components/Modal';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false,
      memos: []
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.getAllMemos();
  }

  getAllMemos = () => {
    fetch('/memo', {
      method: "GET",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
        'Accept': 'application/json',
        },
      mode:"cors",
    }).then( res => {
      return res.json();
    })
    .then( rooms => {
        this.setState({rooms: rooms});
      console.log( "Network success - room : ", rooms );
    })
    .catch( error =>
      console.log( "Network Error : ", error )
    );
  }


  componentWillMount() {
      fetch('/memo', {
        method: "GET",
        headers:{
          "Content-Type": "application/json;charset=UTF-8",
          'Accept': 'application/json',
          },
        mode:"cors",
      }).then( res => {
        return res.json();
      })
      .then( rooms => {
          this.setState({rooms: rooms});
        console.log( "Network success - memo : ", rooms );
      })
      .catch( error =>
        console.log( "Network Error : ", error )
      );
  }

  
  render() {
    return(
      <div className='container'>
      <div className='App'>
        <h1> 메모장 </h1><br/><br/>
        <table>
						<tbody>
							<tr className='trList'>
                {
                this.state.rooms.map( room =>
									<td className='cell' key={memo._id}>
                      <div className='inner' onClick={this.openModal}>
											<h2> {room.roomIdx} 번 방 </h2>
                      {/* <h5> {room.author} </h5><br/><br/>
											<h4> {room.content} </h4><br/> */}
										</div>
									</td>
                )}
							</tr>
						</tbody>
					</table>
          <main className='App'>
        <Modal isOpen={this.state.isModalOpen} close={this.closeModal} />
      </main>
      </div>
      </div>
    );
  }
}


export default App;
