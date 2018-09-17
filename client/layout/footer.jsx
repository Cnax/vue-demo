import style from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'jj'
    }
  },
  render () {
    return (
      <div id={style.footer}>
        <span>writen By {this.author}</span>
      </div>
    )
  }
}
