var sha256TOOLS = {};
//sha256 constant
sha256TOOLS.k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
//sha256 intial hashes
sha256TOOLS.h = [0x6a09e667,
		0xbb67ae85, 
		0x3c6ef372, 
		0xa54ff53a,
		0x510e527f,
		0x9b05688c,
		0x1f83d9ab,
		0x5be0cd19];
sha256TOOLS.addFrontZero = function addFrontZero(str, fixedlength){
	while(str.length < fixedlength){
		str = 0 + str;
	}
	return str;
};
sha256TOOLS.rotr = function rotr(n,x){
  return (((x >>> n) | (x << 32 - n)) >>> 0) % Math.pow(2,32);
};
sha256TOOLS.ch = function ch(x,y,z){
  return (x & y) ^ (~x & z);
};
sha256TOOLS.maj = function maj(x,y,z){
  return (x & y) ^ (x & z) ^ (y & z);
};
sha256TOOLS.sigma0 = function sigma0(x){
  return this.rotr(2,x) ^ this.rotr(13,x) ^ this.rotr(22,x);
};
sha256TOOLS.sigma1 = function sigma1(x){
  return this.rotr(6,x) ^ this.rotr(11,x) ^ this.rotr(25,x);
};
sha256TOOLS.omega0 = function omega0(x){
  return this.rotr(7,x) ^ this.rotr(18,x) ^ (x >>> 3);
};
sha256TOOLS.omega1 = function omega1(x){
  return this.rotr(17,x) ^ this.rotr(19,x) ^ (x >>> 10);
};
sha256TOOLS.mod = function mod(a,b){
  var temp = a % b;
  while(temp < 0){
  	temp += b;
  }
  return temp;
};
var sha256 = (sha256 || function sha256(string){
	//copy constant values and initial hashes
	var H = sha256TOOLS.h.slice();
	var K = sha256TOOLS.k.slice();

    //sha256 pre processing
    //convert string to ascii code first then to binary
//////////////////////////////////////////////////////
	var str =[];
	for(var ia=0; ia<string.length; ia++){
	  var ta = (string.charCodeAt(ia)).toString(2);
	  ta = (ta.length < 8) ? sha256TOOLS.addFrontZero(ta,8) : ta;
	  str.push(ta);
	}
	//turn str into string
	str = str.join("");
//////////////////////////////////////////////////////

	//Padding the message
	var zeroBits = sha256TOOLS.addFrontZero("",sha256TOOLS.mod(448-(str.length+1), 512));
	var lengthBits = sha256TOOLS.addFrontZero((str.length).toString(2), 64);
	str = str + "1" + zeroBits + lengthBits;
//////////////////////////////////////////////////////
    //checking length off message
    if(str.length > Math.pow(2,64)){
      throw "message length greater than 2 ** 64";
    }
//////////////////////////////////////////////////////
	//parsing the message M into N 512 bit block
//////////////////////////////////////////////////////
	var M = [];
	for(var ib=0; ib<str.length; ib+=512){
	  var tempa = [];
	  for(var j=0; j < 512; j+=32){
	    tempa.push(str.substr(ib+j,32));
	  }
	  M.push(tempa);
	}
//////////////////////////////////////////////////////
	//main loop goes here!
	var a, b, c, d, e, f, g, h, t1, t2;
	for(var i=0; i<M.length; i++){

	  //Message schedule have length of 64
	  var W = [];
	  var temp;

	  //prepare for message diggest,, compression etc...
//////////////////////////////////////////////////////
	  for(var tb=0; tb<64; tb++){
		if(tb < 16){
		  W.push(parseInt(M[i][tb], 2) % Math.pow(2,32));
		}else{
		  temp = (sha256TOOLS.omega1(W[tb-2]) + W[tb-7] + sha256TOOLS.omega0(W[tb-15]) + W[tb-16]) % Math.pow(2,32);
		  W.push(temp);
		}
	  }
//////////////////////////////////////////////////////

	  //real computation between
	  //ints mod 2 ** 32
//////////////////////////////////////////////////////
	  a = H[0];
	  b = H[1];
	  c = H[2];
	  d = H[3];
	  e = H[4];
	  f = H[5];
	  g = H[6];
	  h = H[7];

	  for(var t=0; t<64; t++){
	  	t1 = (h + sha256TOOLS.sigma1(e) + sha256TOOLS.ch(e,f,g) + K[t] + W[t]) % Math.pow(2,32);
	  	t2 = (sha256TOOLS.sigma0(a) + sha256TOOLS.maj(a,b,c)) % Math.pow(2,32);
	  	h = g;
	  	g = f;
	  	f = e;
	  	e = (d + t1) % Math.pow(2,32);
	  	d = c;
	  	c = b;
	  	b = a;
	  	a = (t1 + t2) % Math.pow(2,32);
	  }

	  H[0] = (a + H[0]) % Math.pow(2,32);
	  H[1] = (b + H[1]) % Math.pow(2,32);
	  H[2] = (c + H[2]) % Math.pow(2,32);
	  H[3] = (d + H[3]) % Math.pow(2,32);
	  H[4] = (e + H[4]) % Math.pow(2,32);
	  H[5] = (f + H[5]) % Math.pow(2,32);
	  H[6] = (g + H[6]) % Math.pow(2,32);
	  H[7] = (h + H[7]) % Math.pow(2,32);

	}
//////////////////////////////////////////////////////
	
	var output = "";
	for(var ic=0; ic<8; ic++){
	  var tempb = (H[ic] >>> 0).toString(16);
	  output += (sha256TOOLS.addFrontZero(tempb, 8));
	}
	return output;
});
