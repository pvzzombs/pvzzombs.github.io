var permutation=[],p=[];function perlin(r,e,a){e=e||.05,a=a||.05;var t=255&Math.floor(r),n=255&Math.floor(e),o=255&Math.floor(a),r=r-Math.floor(r),e=e-Math.floor(e),a=a-Math.floor(a),u=fade(r),c=fade(e),i=fade(a),s=p[p[p[t]+n]+o],f=p[p[p[t]+n+1]+o],l=p[p[p[t]+n]+o+1],g=p[p[p[t]+n+1]+o+1],d=p[p[p[1+t]+n]+o],h=p[p[p[1+t]+n+1]+o],m=p[p[p[1+t]+n]+o+1],t=p[p[p[1+t]+n+1]+o+1],n=lerp(grad(s,r,e,a),grad(d,r-1,e,a),u),o=lerp(grad(f,r,e-1,a),grad(h,r-1,e-1,a),u),s=lerp(n,o,u);return n=lerp(grad(l,r,e,a-1),grad(m,r-1,e,a-1),u),o=lerp(grad(g,r,e-1,a-1),grad(t,r-1,e-1,a-1),u),d=lerp(n,o,c),(lerp(s,d,i)+1)/2}function lerp(r,e,a){return(e-r)*a+r}function grad(r,e,a,t){switch(15&r){case 0:return e+a;case 1:return-e+a;case 2:return e-a;case 3:return-e-a;case 4:return e+t;case 5:return-e+t;case 6:return e-t;case 7:return-e-t;case 8:return a+t;case 9:return-a+t;case 10:return a-t;case 11:return-a-t;case 12:return a+e;case 13:return-a+t;case 14:return a-e;case 15:return-a-t;default:return 0}}function fade(r){return r*r*r*(r*(6*r-15)+10)}function pNoise(r,e,a,t,n){e=e||.99,a=a||.99,t=t||6,n=n||.35;for(var p=0,o=2,u=5,c=0,i=0;i<t;i++)p+=perlin(r*o,e*o,a*o)*u,c+=u,u*=n,o*=2;return p/c}function setup(r){createCanvas(300,300).parent("cv-holder");for(var e,a,t=0;t<256;t++)permutation[t]=t;for(var n=permutation.length;n;)e=Math.floor(Math.random()*n--),a=permutation[n],permutation[n]=permutation[e],permutation[e]=a;for(var o=0;o<512;o++)p[o]=permutation[o%256]}var g=0;function draw(){line(g,151*pNoise(g/100),g+1,151*pNoise((g+1)/100)),line(g,141*noise(g/100)+160,g+1,141*noise((g+1)/100)+160),++g}