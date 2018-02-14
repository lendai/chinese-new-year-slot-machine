import React from 'react'
import Marquee from 'react-smooth-marquee'

const Spacer = () => <span style={{ minWidth: '40px', display: 'inline-block' }} />

const HeaderMarquee = () => (
  <div className="marquee">
    <Marquee>
      🐉
      <Spacer />
      新年快乐
      <Spacer />
      Happy New Year!
      <Spacer />
      🏮
      <Spacer />
      有钱就是任性
      <Spacer />
      Remember to try the dumplings!
      <Spacer />
      新年快乐
      <Spacer />
      Happy New Dog!
      <Spacer />
      🐶
      <Spacer />
      生ビール四つ
      <Spacer />
      Whenever I am sad I think of H**** and get Happy Again
      <Spacer />
      😂
      <Spacer />
      感覺如何
      <Spacer />
      A dog is a dog but a dog is a best friend
      <Spacer />
      ⭐️
      <Spacer />
      Hej på dej
    </Marquee>
  </div>
)

export default HeaderMarquee
