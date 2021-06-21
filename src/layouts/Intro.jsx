import React from 'react';
import { Card, CardView } from '../components/card';
function Intro(props) {
  return <CardView onEnd={props.onEnd}>
    <Card style={{ textAlign: "center" }}>Dealing with <u>addiction</u> can be hard.</Card>

    <Card>Maybe rehab doesn't exist for your kind of addiction. Or maybe you just don't wanna go because you're worried that people will know.</Card>

    <Card>But, do you have the <i>dedication</i> to quit your addiction by yourself?<br /><br />
    If the answer is <b>yes</b>, this simple web app might be able to help.<br />
    This takes a different approach to the problem.</Card>

    <Card>How do people get <u>addicted</u>?<br /><br />
    We start with something <small>small</small>, like an experiment. We like it and try to do a little more, thinking that we're in control.<br />
    And soon it goes <big>out of control.</big></Card>

    <Card><b>This</b> tries to take this backward. Initially, you are allowed to continue with your bad habits with small gaps in between. Gradually the gaps are increased.<br />
    When you've not done the <u>bad habit</u> for some time, it incentivizes you by allowing you to do the <u>bad habit</u>.</Card>

    <Card>It teaches you coping skills that might work for you, but more importantly, it motivates you. This helps keep you focused on quitting and helps motivate you to try to change.</Card>

    <Card><div style={{ fontSize: '0.6em' }}>If you don't have self-determination, or you relapse with the incentives, that will be a problem. But the idea behind this approach is that you've enough determination to stop your addiction, with this app acting as a motivator.<br /><br />
    This is an offline app. All your data is stored in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a>.<br /><br />
      <span style={{ fontFamily: 'serif' }}>Some addictions might need professional help. If so be the need, don't hesitate to reach out.</span><br /><br />
    And lastly, if this approach, this app, helped you, do share your experience.</div></Card>
  </CardView>;
}

export default Intro;