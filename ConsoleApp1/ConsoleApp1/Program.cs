// For Loops

//for (int i = 5; i >=0; i--)
//{
//    Console.WriteLine(i);
//    Thread.Sleep(500);
//}
//Console.WriteLine("Happy New Year!");

//Console.ReadKey();

// While Loops
//string userInput;

//Console.WriteLine("Enter your name:");
//userInput = Console.ReadLine();

//while (userInput == "")
//{
//    Console.WriteLine("Enter your name: ");
//    userInput = Console.ReadLine();
//}
//Console.WriteLine($"Hello, {userInput}");

//Console.ReadKey();

// Do While Loop

//string password;
//int counter = 0;
//do
//{
//    Console.WriteLine("Enter your password");
//    password = Console.ReadLine();

//    counter += 1;
//} while (password != "mayuskys" && counter < 3);

//if (counter >= 3)
//{
//    Console.WriteLine("Too many attemps, your account has been blocked");
//}
//else 
//{
//    Console.WriteLine("You have signed in succesfully");
//}

//    Console.ReadKey();

////Arrays

using System.Collections.Concurrent;
using System.Runtime.CompilerServices;

///a varible that can store mutile values. fixed size
//string[] cars = { "Toyota", "Honda", "Nissan", "Subaru" };
//foreach(string car in cars)
//    Console.WriteLine(car);

//Console.ReadKey();

int[] fufaScale = { 1, 2, 3, 4, 5 };
foreach (int scale in fufaScale) {
    Console.WriteLine(scale);
}

Console.ReadLine();