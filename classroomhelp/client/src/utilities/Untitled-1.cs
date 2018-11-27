using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace First_App
{
  
    class values
    {
        //this is going to take care of the speed
        int speed;
        int fast = 5;
        int slow = -2;

        public int keyPressFast()
        {
            int fastSpeed = speed + fast;
            Console.WriteLine(fastSpeed);
            return fastSpeed;

        }

        public int keyPressSlow()
        {
            int slowSpeed = speed + slow;
            Console.WriteLine(slowSpeed);
            return slowSpeed;
        }

        public void Display()
        {
            Console.WriteLine("Speed: {0}", speed);
        }

    }

    class executeKeypress
    {
        static void Main(string[] args)
        {
            values v = new values();
            v.keyPressFast();
            v.keyPressSlow();
            Console.ReadLine();
        }
    }




}

