import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDuration } from '../../../common/js/util'
import { changeCurrent, addPrepareList, changeCurIndex } from '../../../redux/preparelist.redux'
import { fetchSong } from '../../../redux/song.redux'
import './style.styl'

@connect( // 将store和组件联系在一起
  state => ({ // mapStateToProps
    prepareObj: state.prepareListReducer,
  }),
  { // mapDispatchToProps
    changeCurrent, fetchSong, addPrepareList, changeCurIndex,
  },
)
export default class SongInfo extends React.Component {
  constructor(props) {
    super(props)
    this.playMuisc = this.playMuisc.bind(this)
  }
  playMuisc(item) {
    this.props.changeCurrent(item)
    this.props.addPrepareList(item)
    this.props.changeCurIndex(this.props.prepareObj.preparelist.length)
    this.props.fetchSong(item.id)
  }
  render() {
    const { playlist } = this.props
    return (
      <div className="songtb">
        <div className="title">
          <h3>歌曲列表</h3>
          <span className="track-count">{playlist.trackCount}首歌</span>
          <div className="more">播放:<strong className="play-count">1924332</strong>次</div>
          <div className="out">
            <i className="icn-music" />
            <Link className="out-link" to="./3">生成外链播放器</Link>
          </div>
        </div>
        <div className="song-list">
          <table className="m-table">
            <thead>
              <tr>
                <th className="first"><div /></th>
                <th><div className="thbg th2" /></th>
                <th><div className="thbg th3" /></th>
                <th><div className="thbg th4" /></th>
                <th><div className="thbg th5" /></th>
              </tr>
            </thead>
            <tbody onMouseOut={this.handleMouseOut} >
              {
                playlist.tracks && playlist.tracks.map((item, index) => (
                  <tr key={item.id} className="song-tr">
                    <td><div className="left"><button className="icn-play" onClick={() => this.playMuisc(item)} /><span className="num">{index + 1}</span></div></td>
                    <td><div className="txt"><Link className="init-link" title={item.name} to={`/song/${item.id}`}>{item.name}</Link></div></td>
                    <td>
                      <span className="song-dur">{formatDuration(item.dt)}</span>
                      <div className="hshow">
                        <span className="icn icn-add" />
                        <span className="icn-colle" />
                        <span className="icn-share" />
                        <span className="icn-down" />
                      </div>
                    </td>
                    <td><div className="text"><Link className="init-link" to={`/song/${item.id}`}>{item.ar[0].name}</Link></div></td>
                    <td><div className="text"><Link className="init-link" title={item.al.name} to={`/song/${item.id}`}>{item.al.name}</Link></div></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
