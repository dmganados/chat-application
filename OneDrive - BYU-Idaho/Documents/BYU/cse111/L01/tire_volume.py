# Import math module so we can use pi
import math
# Import the datetime to use in the text file
from datetime import datetime

# Get the user input
# Convert the user input to float() to get the numbers with decimal points
width = input("Enter the width of the tire in mm (ex 205): ") 
width = float(width)
ratio = input("Enter the aspect ratio of the tire (ex 60): ")
ratio = float(ratio)
diameter = input("Enter the diameter of the wheel in inches (ex 15): ")
diameter = float(diameter)

# Compute the volume of space inside the tire
# Solve the values inside the parenthesis first
width_and_ratio = width * ratio
diameter_and_constant = 2540 * diameter
# Compute the values outside the parenthesis and the values inside the parenthesis and divide with 10000000000
volume = math.pi * width**2 * ratio * (width_and_ratio + diameter_and_constant)
total_volume = volume / 10000000000
# Round the amount to nearest thousandths
total_volume = round(total_volume, 2)
# Print the output using f-string
print(f"The approximate volume is {total_volume} liters")

# Get the computer's date and time to display in the text file later
date = datetime.now()
# Use date.strftime() to get specific value in the datetime
# Here we only get the year, month, and day
year = date.strftime("%Y")
month = date.strftime("%m")
day = date.strftime("%d")
# Use f string to structure the output accordingly: YYYY-MM-DD, width, ratio, daimeter, volume
data = f"{year}-{month}-{day}, {width}, {ratio}, {diameter}, {total_volume}"

# Use with open() function to automatically close the function after running. 
with open('volumes.txt', 'a+') as my_file:
    # Convert to str since write() will only accept string.
    my_file.write(str(data))
    my_file.writelines('\n')




