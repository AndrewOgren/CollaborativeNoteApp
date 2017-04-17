import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go baby!');

let numSecs = 0;
setInterval(() => {
  numSecs += 1;
  document.getElementById('main').innerHTML = `You've been on this page for ${numSecs} seconds.`;
}, 1000);
