ts=0.04;
ta = 0:ts:16.4;  
tb=ta.';
absx=abs(acc_x);
absy=abs(acc_y);
absz=abs(acc_z);
velx=cumtrapz(absx,tb);
vely=cumtrapz(absy,tb);
velz=cumtrapz(absz,tb);
X=sqrt(power(velx,2)+power(vely,2)+power(velz,2));
%X=X-84;
windowWidth = 11; % Whatever you want.
kernel = ones(windowWidth,1) / windowWidth;
output = filter(kernel, 1, X);
plot(tb,output);