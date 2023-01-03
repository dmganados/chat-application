"""
When you physically exercise to strengthen your heart, you
should maintain your heart rate within a range for at least 20
minutes. To find that range, subtract your age from 220. This
difference is your maximum heart rate per minute. Your heart
simply will not beat faster than this maximum (220 - age).
When exercising to strengthen your heart, you should keep your
heart rate between 65% and 85% of your heart’s maximum rate.
"""
# Get the user's input
age_input = input("Please enter your age: ")

# Convert the user's input to integer
# Subtract 220 with the user's input according to the instruction
age = int(age_input)
result = 220 - age

# Round the decimals and make it as whole number
low_percentage = int(round(result * .65))
high_percentage = int(round(result * .85))

# Use an f-string to print the message 
print(f"When you exercise to strengthen you heart, you should\nkeep your heart rate between {low_percentage} and {high_percentage} beats per minute.")