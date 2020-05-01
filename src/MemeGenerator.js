import React, {Component} from "react"

class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			topText: "",
			bottomText: "",
			randomImg: "http://i.imgflip.com/1bij.jpg",
			allMemeImgs: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		const{name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event){
		event.preventDefault();
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
		const memeImg = this.state.allMemeImgs[randNum].url
		this.setState({randomImg: memeImg})
		const mmm = this.state.allMemeImgs.map(function(item){
			return item.url
		})
		console.log(mmm)
	}

	componentDidMount() {
		const delMemNum = [
			93, 85, 83, 75, 71, 67, 65, 63, 62, 59, 42, 41,
			39, 29, 27, 21, 18, 14, 12, 10, 9, 8, 7, 6, 5, 1
		];
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => {
				const {memes} = response.data
				 
				
				this.setState({ allMemeImgs: memes })
			})
	}

	render() {
		return (
			<div>
				<form className="meme-form" onSubmit={this.handleSubmit}>
					<input
						autoComplete="off"
						type="text"
						value={this.state.topText}
						name="topText"
						placeholder="Текст Вверху"
						onChange={this.handleChange} />
					<input
						autoComplete="off"
						type="text"
						value={this.state.bottomText}
						name="bottomText"
						placeholder="Текст Внизу"
						onChange={this.handleChange} />
					<button >Gen</button>
				</form>
				<div className="meme">
					<img align="center" src={this.state.randomImg} alt="" />
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText}</h2>
				</div>
			</div>
		)
	}
}

export default MemeGenerator