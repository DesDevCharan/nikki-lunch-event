// Import stylesheets
import './style.css';

window.matchLunchEvent = function (arr) {
  const me = arr[0];
  const minStart = me.start;
  const minEnd = me.end;
  const matched = { start: 0, end: 0, max: 0 };
  document.getElementById("app").innerHTML = '';
  const promise = new Promise(function (resolve, reject) {
    for (let i = 1; i < arr.length; i++) {
      matchChecker(arr[i]);
      if (i === arr.length - 1) {
        resolve(true);
      }
    }
  });
  promise.then(() => {
    arr.sort((a, b) => a.start - b.start);
    for (let i = 0; i < arr.length; i++) {
      prepareDOM(arr[i]);
    }
  }).catch(() => console.log('Oh Ho!!!!---Error'));
  function matchChecker(obj) {
    let lap = 0;
    if (obj.start < minStart) {
      lap = Math.abs(obj.end - minStart);
    } else {
      lap = Math.abs(minEnd - obj.start);
    }
    if (lap > 30 && lap > matched.max) {
      matched = obj;
      matched.max = lap;
    } else if (lap > 30 && lap === matched.max) {
      const matchedF = Math.abs(matched.start - minStart);
      const currF = Math.abs(obj.start - minStart);
      if (matchedF < currF) {
        matched = obj;
        matched.max = lap;
      }

    }
  }

  function prepareDOM(obj) {
    const start = obj.start;
    const end = obj.end;
    const divHeight = end - start + 'px';
    let cssString = `;`
    cssString += `height: ${divHeight};border: 2px solid gray;border-left: 10px solid blue;position: absolute;top: ${obj.start}px;width: 30%; box-sizing: border-box; background: white;border-radius: 2mm;`;
    const hasLeft = obj.start % 60;
    if (hasLeft && hasLeft <= 30) {
      cssString += `left:33%;`;
    } else if (hasLeft > 30) {
      cssString += `left:66%;`;
    }
    cssString += applyCSSForMatch(obj);
    const div = document.createElement("div");
    if (obj.start === minStart && obj.end === minEnd) {
      div.innerHTML = "Me";
      if (matched.max) {
        cssString += `border-left: 10px solid green;`;
      } else {
        cssString += `border-left: 10px solid black;`;
      }

    } else {
      div.innerHTML = "Brilliant Lunch";
    }
    div.style.cssText = cssString;
    document.getElementById("app").appendChild(div);

  }
  function applyCSSForMatch(obj) {
    let cssString = `;`
    if (matched.start === obj.start && matched.end === obj.end) {
      cssString += `border-left: 10px solid green;`;
    }
    return cssString;
  }
}



// matchLunchEvent([{ start: 225, end: 285 }, { start: 210, end: 270 }, { start: 180, end: 240 }, { start: 240, end: 300 }, { start: 300, end: 360 }, { start: 270, end: 330 }, { start: 270, end: 330 }, { start: 270, end: 330 }]);

matchLunchEvent([{start:225,end:285},{start:300,end:360},{start:180,end:240}]);