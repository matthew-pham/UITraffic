//
//  ViewController.swift
//  UITraffic
//
//  Created by Matthew Pham on 10/2/18.
//  Copyright © 2018 Matthew Pham. All rights reserved.
//

import UIKit
import CoreLocation
import MapKit

class ViewController: UIViewController, CLLocationManagerDelegate {

    @IBOutlet weak var JSONLabel: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        let locationManager = CLLocationManager()
        locationManager.requestAlwaysAuthorization()
        locationManager.requestWhenInUseAuthorization()
        if CLLocationManager.locationServicesEnabled() {
            locationManager.delegate = self
            locationManager.desiredAccuracy = kCLLocationAccuracyBest
            locationManager.startUpdatingLocation()
        }
        
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    //Handles button action click
    @IBAction func POSTRequest(_ sender: Any) {
        getJson(){
            json in
            //Changes UILabel on main thread
            DispatchQueue.main.async{
                self.JSONLabel.text = json
                self.JSONLabel.sizeToFit()
                self.JSONLabel.setNeedsDisplay()
            }
        }
        
    
        }
    
    /*
     Method that gets JSON from our database
     */
    func getJson(completionBlock: @escaping (String) ->()){
        let url = URL(string: "INSERT URL HERE")!
        var request = URLRequest(url: url)
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        let postString = "INSERT POST REQUEST PARAMS HERE"
        request.httpBody = postString.data(using: .utf8)
        let task = URLSession.shared.dataTask(with: request){ data, response, error in
            guard let data = data, error == nil else {
                print("error=\(error)")
                return
            }
            
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(response)")
            }
            let postRequestOutput =  String(data: data, encoding: .utf8)
            let stringOutput = postRequestOutput!;
            completionBlock(stringOutput);
            
        }.resume()

        
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]){
        guard let locValue: CLLocationCoordinate2D = manager.location?.coordinate else {return}
        print("locations = \(locValue.latitude) \(locValue.longitude) " )
    }
    
}
    


