# Neural Network for Dice Face Recognition



## Nederlands

Deze repository bevat een eenvoudig neuraal netwerk dat in staat is om het gezicht van een dobbelsteen te herkennen wanneer deze plat ligt, specifiek voor een dobbelsteen van 7x7. De visualisatie en logica zijn geïnspireerd op het boek "A.I." geschreven door Lieven Scheire.

### Hoe werkt het

Het neurale netwerk neemt een afbeelding van een dobbelsteen van 7x7 als invoer en vormt deze binair om. Doormiddel van gewichten zal het netwerk vervolgens kunnen bepalen welk gezicht het juiste is. (Deze krijgt de hoogste positieve score van het netwerk!)
Het netwerk onderging basis training voor het herkennen van dobbelsteen getallen (disclaimer: door de simpliciteit van het neuraal netwerk ENKEL 7x7 px dobbelsteen faces waarvan de ogen op de voordehandliggende plaatsten ligt.)

## English

This repository contains a basic neural network capable of recognizing the face of a dice when it's laying flat, specifically for a 7x7 dice (in pixels). The visualization and logic are inspired by the book "A.I." written by Lieven Scheire.

### How it works

The neural network takes a 7x7 image of a die as input and converts it into binary. Then, using weights, the network can determine which face is the correct one (the one with the highest positive score from the network!). The network underwent basic training for recognizing die numbers (disclaimer: due to the simplicity of the neural network, ONLY 7x7 px die faces where the pips are in obvious positions were considered.)