//Wiced Sense is mounted on the top of firebird.
//This code provides linear acceleration of firebird through PWM by sending a start bit (8) over zigbee to test the readings from wiced by collecting the sensor data.
// It is again decelerated by sending a stop bit (5). A bar graph display provides a visualization of current speed.
#define F_CPU 14745600
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>

unsigned char data;
int b=0;
void data_in(char*);

//Function to configure ports to enable robot's motion
void motion_pin_config (void) 
{
 DDRA = DDRA | 0x0F;
 PORTA = PORTA & 0xF0;
 DDRL = DDRL | 0x18;   //Setting PL3 and PL4 pins as output for PWM generation
 PORTL = PORTL | 0x18; //PL3 and PL4 pins are for velocity control using PWM.
}

//Function to initialize ports
void init_ports()
{
 motion_pin_config();
 LED_bargraph_config();
}

//Function To Initialize UART0
// desired baud rate:9600
// actual baud rate:9600 (error 0.0%)
// char size: 8 bit
// parity: Disabled
void uart0_init(void)
{
	UCSR0B = 0x00; //disable while setting baud rate
	UCSR0A = 0x00;
	UCSR0C = 0x06;
	UBRR0L = 0x5F; //set baud rate lo
	UBRR0H = 0x00; //set baud rate hi
	UCSR0B = 0x98;
}


void LED_bargraph_config (void)
{
	DDRJ = 0xFF;  //PORT J is configured as output
	PORTJ = 0x00; //Output is set to 0
}

// Timer 5 initialized in PWM mode for velocity control
// Prescale:256
// PWM 8bit fast, TOP=0x00FF
// Timer Frequency:225.000Hz
void timer5_init()
{
	TCCR5B = 0x00;	//Stop
	TCNT5H = 0xFF;	//Counter higher 8-bit value to which OCR5xH value is compared with
	TCNT5L = 0x01;	//Counter lower 8-bit value to which OCR5xH value is compared with
	OCR5AH = 0x00;	//Output compare register high value for Left Motor
	OCR5AL = 0xFF;	//Output compare register low value for Left Motor
	OCR5BH = 0x00;	//Output compare register high value for Right Motor
	OCR5BL = 0xFF;	//Output compare register low value for Right Motor
	OCR5CH = 0x00;	//Output compare register high value for Motor C1
	OCR5CL = 0xFF;	//Output compare register low value for Motor C1
	TCCR5A = 0xA9;	/*{COM5A1=1, COM5A0=0; COM5B1=1, COM5B0=0; COM5C1=1 COM5C0=0}
 					  For Overriding normal port functionality to OCRnA outputs.
				  	  {WGM51=0, WGM50=1} Along With WGM52 in TCCR5B for Selecting FAST PWM 8-bit Mode*/
	
	TCCR5B = 0x0B;	//WGM12=1; CS12=0, CS11=1, CS10=1 (Prescaler=64)
}

// Function for robot velocity control
void velocity (unsigned char left_motor, unsigned char right_motor)
{
	OCR5AL = (unsigned char)left_motor;
	OCR5BL = (unsigned char)right_motor;
}

//Function used for setting motor's direction
void motion_set (unsigned char Direction)
{
 unsigned char PortARestore = 0;

 Direction &= 0x0F; 			// removing upper nibbel as it is not needed
 PortARestore = PORTA; 			// reading the PORTA's original status
 PortARestore &= 0xF0; 			// setting lower direction nibbel to 0
 PortARestore |= Direction; 	// adding lower nibbel for direction command and restoring the PORTA status
 PORTA = PortARestore; 			// setting the command to the port
}


void forward (void) //both wheels forward
{
  motion_set(0x06);
}


void init_devices (void) //use this function to initialize all devices
{
 cli(); //disable all interrupts
 init_ports();
 timer5_init();
 uart0_init();
 sei(); //re-enable interrupts
}

SIGNAL(SIG_USART0_RECV) 		// ISR for receive complete interrupt
{
	data = UDR0;
	UDR0 = data;
	if (data == 0x35)
	{
		b=0;
	}
	if(data == 0x38)
	{
	b=1;
	}	
    
		
			
			
}	


//Main Function
int main()
{
	init_devices();
	
	while(1)
	{
			velocity (0, 0);
			_delay_ms(100);
		
		if(b == 1)
		{
			//enable global interrupts
			sei();
			for (int a=50; a<255;a++)
			{
				velocity (a, a); //Increasing the robot velocity
				forward(); //both wheels forward
				_delay_ms(100);
			if(a>49){PORTJ = 0x01;} //Turning Bar graph led ON.
			if(a>75){PORTJ = 0x03;}
				if(a>100){PORTJ = 0x07;}
					if(a>125){PORTJ = 0x0F;}
						if(a>150){PORTJ = 0x1F;}
							if(a>175){PORTJ = 0x3F;}
								if(a>200){PORTJ = 0x7F;}
									if(b == 0){break;}
									}		
			}		
	}
}

