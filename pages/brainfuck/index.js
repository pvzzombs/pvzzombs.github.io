function bf(e){e=e.split("");for(var m=[0],t=0,r=[],n=[],p=1,s=0;s<e.length&&4e6!==p;){if(">"===e[s])m.length==(t+=1)&&m.push(0),n.push({cmd:">",mem:m[t],pnt:t}),p++;else if("<"===e[s])n.push({cmd:"<",mem:m[t=--t<0?m.length-1:t],pnt:t}),p++;else if("+"===e[s])m[t]+=1,255<m[t]&&(m[t]=0),n.push({cmd:"+",mem:m[t],pnt:t}),p++;else if("-"===e[s])--m[t],m[t]<0&&(m[t]=255),n.push({cmd:"-",mem:m[t],pnt:t}),p++;else if("."===e[s])r.push(String.fromCharCode(m[t])),n.push({cmd:".",mem:m[t],pnt:t,code:String.fromCharCode(m[t])}),p++;else if(","===e[s]){var f=prompt("Input Command Detected - Enter a character : ","");""===f?m[t]=0:(f=f||"A",m[t]=parseInt(f.charCodeAt(0))),n.push({cmd:",",mem:m[t],pnt:t}),p++}else if("["===e[s]){if(0===m[t]){var h=0;for(s+=1;s<e.length&&("]"!==e[s]||0!==h);)"["===e[s]?h+=1:"]"===e[s]&&--h,s+=1;p++}}else if("]"===e[s]&&0<m[t]){var i=0;for(--s;0<=s&&("["!==e[s]||0!==i);)"]"===e[s]?i+=1:"["===e[s]&&--i,--s;p++}s+=1}return n}