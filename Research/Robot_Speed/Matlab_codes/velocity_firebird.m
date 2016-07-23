%x=filter(0.5,[1 0.5-1],XAxis);
ts=0.04;
ta = 0:ts:16.4;  
tb=ta.';
absx=abs(acc_x);
absy=abs(acc_y);
absz=abs(acc_z);
velx=cumtrapz(absx,tb);
vely=cumtrapz(absy,tb);
velz=cumtrapz(absz,tb);
acc_mag = sqrt(power(acc_x,2) + power(acc_y,2) +power(acc_z,2));
acc_mag = acc_mag-84;
filtCutOff = 0.3;
[b, a] = butter(1, (2*filtCutOff)/(1/0.4), 'high');
acc_magFilt = filtfilt(b, a, acc_mag);

% Compute absolute value
acc_magFilt = abs(acc_magFilt);

% LP filter accelerometer data
filtCutOff = 0.3;
[b, a] = butter(1, (2*filtCutOff)/(1/0.3), 'low');
acc_magFilt = filtfilt(b, a, acc_magFilt);
X=sqrt(power(velx,2)+power(vely,2)+power(velz,2));
X=X-84;
windowWidth = 11; % Whatever you want.
kernel = ones(windowWidth,1) / windowWidth;
output = filter(kernel, 1, X);
plot(tb,output);
grid on
title('Automobile Velocity X')
xlabel('Time (s)')
ylabel('Velocity (m/s)')