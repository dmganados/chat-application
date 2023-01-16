# Import datetime to use day and date
from datetime import datetime

# Get and display the computer's day, date, and time 
date = datetime.now()
# week = date.weekday()
day = date.strftime("%A")
# day = "Monday"
print(f"Today is {day}, {date}")

# Ask user of the subtotal and assign variable for required amount
# that a discount can be applied
subtotal = float(input("Please enter the subtotal: "))
amount_required = 50
sales_tax = round(subtotal * .06, 2)

# Use if else statement since there is a conditon that 
# a customer can get a discount 
if subtotal >= amount_required and day == "Tuesday" or day == "Wednesday":
    # Multiply the subtotal with 10% discount
    # Round the output to nearest thousandths
    discount = round(subtotal * .10, 2)
    # Display the discount and sales tax
    print(f"Discount amount: {discount}")
    print(f"Sales tax amount: {sales_tax}")    
    # Compute by subtracting subtotal and discount, then add the sales tax
    # Round to the nearest thousandths
    total = round(subtotal - discount + sales_tax, 2) 
    # Display total for the user to see
    print(f"Total: {total}")
else:
    # Display the discount and sales tax
    print(f"Sales tax amount: {sales_tax}") 
    # Compute by subtracting subtotal and discount, then add the sales tax
    # Round to the nearest thousandths
    total = round(subtotal + sales_tax, 2)
    # Display total for the user to see
    print(f"Total: {total}")

