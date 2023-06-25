import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { MdWorkOutline } from 'react-icons/md'

function Footer() {
  return (
    <div className="container footer-container">
      <p>&#169; All Rights Reserved 2023.</p>
      <div className="social-media">
        Yossi Karasik
        <a href='https://github.com/yosikari'><AiFillGithub /></a>
        <a href='https://www.linkedin.com/in/yosikari'><AiFillLinkedin /></a>
        <a href='https://yossikarasik.com'><MdWorkOutline /></a>
      </div>
    </div>
  )
}

export default Footer