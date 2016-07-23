figure
%vel = cumsum(ZAxis);
ts=0.04;
ta = 0:ts:16.4;
tb=ta.';
velx=cumtrapz(acc_x,tb);
vely=cumtrapz(acc_y,tb);
velz=cumtrapz(acc_z,tb);
absx=abs(velx);
absy=abs(vely);
absz=abs(velz);
x=filter(0.04,[1 0.04-1],absx);
y=filter(0.12,[1 0.12-1],absy);
z=filter(0.12,[1 0.12-1],absz);
subplot(2, 2, 1);
plot(tb,x);
grid on
title('Automobile Velocity X')
xlabel('Time (s)')
ylabel('Velocity (m/s)')
subplot(2, 2, 2);
plot(tb,y);
title('Automobile Velocity Y')
xlabel('Time (s)')
ylabel('Velocity (m/s)')
subplot(2, 2, 3);
plot(tb,z);
title('Automobile Velocity Z')
xlabel('Time (s)')
ylabel('Velocity (m/s)')
subplot(2, 2, 4);
plot(tb,acc_x);
title('Automobile Velocity Z')
xlabel('Time (s)')
ylabel('Velocity (m/s)')
