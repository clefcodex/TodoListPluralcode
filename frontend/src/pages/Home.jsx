import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Home.css'
import myImage from "../assets/graphic.png"
// import '../assets/graphic.png'


export default function Home() {


  return (
    <>
     <section class="hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 hero-content">
                    <h1>Unleash Your Productivity</h1>
                    <p class="lead">Conquer your tasks with our powerful and intuitive task management tool.</p>
                    <a href="/signup" class="btn btn-primary cta-button">Sign Up Free</a> &nbsp;
                    <a href="/learnmore" class="btn btn-outline-primary">Learn More</a>
                </div>
                <div class="col-md-6">
                    <img src={myImage} alt="Task Management Illustration" class="img-fluid" />
                    </div>
            </div>
        </div>
    </section>

    <section class="features py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-4 text-center">
                    <i class="fas fa-tasks feature-icon"></i>
                    <h3>Effortless Task Management</h3>
                    <p>Create, organize, and prioritize tasks with ease. Stay on top of your to-do list.</p>
                </div>
                <div class="col-md-4 text-center">
                   <i class="fas fa-users feature-icon"></i>
                    <h3>Seamless Collaboration</h3>
                    <p>Work together with your team, share tasks, and track progress seamlessly.</p>
                </div>
                <div class="col-md-4 text-center">
                    <i class="fas fa-chart-line feature-icon"></i>
                    <h3>Visual Progress Tracking</h3>
                    <p>Monitor your progress with visual dashboards and reports. Stay motivated and focused.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="cta py-5">
        <div class="container text-center">
            <h2>Ready to Get Started?</h2>
            <p class="lead">Sign up for free and experience the power of our task management tool.</p>
            <Link to="/signup"><a class="btn btn-primary cta-button">Sign Up Free</a></Link>
        </div>
    </section>
    </>
  );
}
