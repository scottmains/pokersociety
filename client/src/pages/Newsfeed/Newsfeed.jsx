import React from 'react'
import Navbar from '../../components/Navbar/Navbar';


const categories = ['Announcement: ', 'General: ', 'Game: ', 'Other: '];

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    var posts = this.state.posts.concat([post]);
    this.setState({
      posts: posts
    });
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =>
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
       
        {filteredPosts.length > 0 ? filteredPosts : posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
}

class Post extends React.Component {
  render() {
    return (
      <div className="mx-auto p-6 max-w-sm text-white bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 mt-10">
        <span className="label">{this.props.value.category}</span>
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
}

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form md:w-1/3 w-2/3 mx-auto pt-20">
        <form onSubmit={this.handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-black">
            Category:
            <select className="w-full h-10 pl-3 pr-6 text-base placeholder-black border rounded-lg appearance-none focus:shadow-outline" ref={(input) => this.category = input}>
              {categories.map((category, index) =>
                <option key={category} value={category}>{category}</option>
              )}
            </select>
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Content:
            <input className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg 
            focus:shadow-outline" type="text" ref={(input) => this.content = input} />
          </label>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
           text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    )
  }
}




class Newsfeed extends React.Component {
  render() {
    return (
      <div className="text-center mx-auto bg-gray-300 h-screen">
        <Navbar/>
        <Feed />
      </div>
    );
  }
}

export default Newsfeed
 
