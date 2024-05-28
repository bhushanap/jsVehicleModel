# 🚗Autonomous Vehicle Simulator with Neural Network

![image](https://github.com/bhushanap/jsVehicleModel/assets/83635464/c54a2373-ab0f-454a-bf68-91238e4ec970)

This project was inspired by [Radu Mariescu's](https://radufromfinland.com/) tutorial series. Autonomous agents employ neural networks to map sensory input to control decisions, a process mastered through reinforcement learning. In the realm of autonomous vehicles, extensive training is imperative. Simulations prove invaluable for accelerating this learning curve. This endeavor focuses on simulating vehicle dynamics, creating a simulator as a preliminary step.

## 🔬Introduction

Leveraging this simulator, a basic neural network is trained to navigate complex traffic scenarios. This methodology streamlines the training process, ensuring that the agent efficiently learns to navigate autonomously.
Goals

## 🤖 Goal

The goal of this project is to develop an autonomous reinforcement learning agent (car) simulator and then train it using a simple neural network so that it can navigate simulated traffic using its sensors to traverse along a straight highway.

- Develop a vehicle simulator
- Simulate environment and traffic
- Train the agent to be autonomous

## 🚧Work Done

The background was setup using basic HTML and CSS canvas. On this, using CSS draw methods, the road, its lanes, etc. were made with each declared as its own JavaScript object. The vehicle was modeled with no-slip condition satisfying the Ackermann steering.
![carmodel1](https://github.com/bhushanap/jsVehicleModel/assets/83635464/55399f1f-faa2-41e1-819e-f2d330ca222c)

The car has 3 basic input parameters:
- Accelerate
- Left Steer
- Right Steer

This is not too accurate but works for this simple model. These three will be the output of the neural network.

Then we add sensor lines for the vehicle which would help it detect what is in front of it. The sensor distances are directly mapped to the neural network as inputs. This will be useful later when traffic is simulated and the vehicle needs to dodge the traffic. A collision detection method is added to check for fail cases. This is implemented using the intersection of the polygon method. Traffic is simulated by using car class made earlier and adding it as a dummy that moves with a constant speed in the vertical direction.

## 📊Simulator Running

The network is a two-layer fully connected network. The code is not vectorized making it very slow to run. So only few nodes were chosen. A visualizer is also made for the nodes.

![image](https://github.com/bhushanap/jsVehicleModel/assets/83635464/a93272ac-63d2-40ee-82f9-36320ee075c5)

## 📉Results

To train the network, lots of episodes are randomly generated with randomly initialized values for the weights and biases. The basic idea behind this is that there will be some network weight that will work correctly that will give us a proper mapping between sensor activations to the actuator activations.
The network is ran in parallel for multiple iterations to get the best possible result. The car ends up navigating initial traffic but manages to struggle with getting past the cars. Instead, it gets stuck in a loop where it gets close to the car, slows down and again accelerates. This is because the reward policy rewards the agent with the maximum run time as the other agents reach an end state due to collision. This could be fixed in a future version by changing the reward policy.
Another reason for the poor performance is because the network is so basic, it does not get to encode complex information in its mapping. This makes the car struggle as the traffic is increased.
![carsimnet1](https://github.com/bhushanap/jsVehicleModel/assets/83635464/3b4ebaf0-de8f-412b-b814-c02e47723911)

## ⚙️Running

Clone the repo: `https://github.com/bhushanap/jsVehicleModel`
For:
**Simulator playground**
Navigate to: selfDrivingCar/version_latest
**Road simulator (Manual)**
Navigate to: selfDrivingCar/version5_Manual
**Road simulator (AI Agent)**
Navigate to: selfDrivingCar/version4_AI

![carsimnet1](https://github.com/bhushanap/jsVehicleModel/assets/83635464/31fc7165-5733-4a2b-bcb5-c72a0b81a12b)

Open: index.html in a JS compatible browser to launch the demo
