import "./AboutApp.css";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import authService from "../../../Services/AuthService";
import config from "../../../Utils/Config";
import Footer from "../Footer/Footer";

function AboutApp(): JSX.Element {

    return (
        <div className="AboutApp">
            <br />
            <div><h1>Hi everyone,
                my name is MESHI.</h1>
                I am a pitbull dog, and I was adopted by my  parents when i was 2 months old .
                Today I am 2 years old, my birthday date is 01.09.2020.
            </div>
            <br />
            <div>
                Welcome to my website!
                My mom built it by herself!
                On this site, my mom and I will give you information through the dogs perspective.
            </div>
            <br />
            <div>We all know that it is not easy for people to understand us.
                Some of them make a lot of effort to understand us.
                It wasn't always easy for me and my parents with each other.
                Sometimes we had misunderstandings and disagreements in many situations!
                Sometimes they did things that were so incomprehensible to me!
                Because I didn't know how to act in these cases,
                I acted in a way that caused them disappointment and frustration.
                But I think the thing that helped us was the constant attempt to understand each other.
                I always feel that no matter what, my parents love me, and I love them!
                The bond between us is very strong, and whenever there is a crisis, it is clear to both sides that there is only one option and that is to solve the problem!
                There is no option to give up!
            </div>
            <br />
            <div>
                So here is my first tip for you:
                For humans-
                When you really love someone,
                your intuition works well in the right place, it doesn't matter if it's a dog or a human, or another animal.
                Don't afraid listen to your senses!
                For dogs -
                How to get mom and dad's food -
                while they are going with the plate to the table,
                do something surprising that will make them drop the food on the floor,
                humans for some reason don't eat food from the floor so they throw in the trash,
                but instead of throwing it in the trash they choose from there what the dog is allowed to eat,
                and... That's how you'll earn their dish!
                You're welcome ☺
            </div>
            <br />
            <div>
                On this site you will receive from me tips for the products I use, with an explanation of the product, and a price range.
                You can subscribe to the site and rate the products you've used and liked, giving you a broader perspective on the product by letting you know how many people have used and liked that product.
                In addition, I will recommend other things here such as: nice places for treval in Israel, activities for dogs, treatments, and everything that humans would like to know about dogs.
                The site will be updated gradually, depending on demand.
                At this stage, you are invited to be impressed by the products I have published so far, and to rate (the ranking will be allowed to those who subscribe to the site only),
                and create a list for yourself with the products you liked, and you will have a great shopping list for your the next shopping ☺
            </div>
            <div>
                I invite you to visit my Instagram profile and follow me there as well.
                <br />Hope you will enjoy ☺
            </div>
           
        </div>
    );
}

export default AboutApp;
