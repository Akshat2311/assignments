__doc__ = """Python code to get the weather details from the API on the basis of the user input """

import requests
import json

API = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22'


#Function to get date input from user
def get_date():
    usr_date = input('Enter the date for which you want weather details (yyyy-mm-dd hh:mm:ss) : ')

    return usr_date


#Function to get choice input from user
def get_input():
    usr_inp = int(input('Enter the value\
                        \n1. Get Weather\
                        \n2. Get Windspeed\
                        \n3. Get Pressure\
                        \n0. Exit\n'))
    return usr_inp


#Function to get temperature
def get_temp(input_date, result, n):
    return (f"The temperature of input date {input_date} is {result['list'][n]['main']['temp']}")


#Function to get windspeed
def get_windspeed(input_date, result, n):
    return (f"The windspeed of the input date {input_date} is {result['list'][n]['wind']['speed']}")


#Function to get pressure
def get_pressure(input_date, result, n):
    return (f"The pressure of the input date {input_date} is {result['list'][n]['main']['pressure']}")


#Function to get details based on user choice
def get_details(usr_choice, result):

    n = 0
    count = 0
    
    while (int(usr_choice) != 0):

        input_date = get_date()

        while (n <= len(result['list'])):
            if ((result['list'][n]['dt_txt']) == input_date):
                if int(usr_choice) == 1:
                    print(get_temp(input_date, result, n))
                elif int(usr_choice) == 2:
                    print(get_windspeed(input_date, result, n))
                elif int(usr_choice) == 3:
                    print(get_pressure(input_date, result, n))
                else:
                    print('Invalid Input')

                count += 1

                break

            n += 1
        
        if count == 0:
            print(f'No data found for the given date {input_date}')

        usr_choice = get_input()



#Function to get data from API
def get_data(API):

    response = requests.get(API)

    if response.status_code == 200:
        result = response.json()
    else:
        return ('Érror: {0}'.format(response.status_code))
    
    usr_choice = get_input()

    get_details(usr_choice, result)


if __name__ == '__main__':
    get_data(API)
    