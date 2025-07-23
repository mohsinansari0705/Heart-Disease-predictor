from http.server import BaseHTTPRequestHandler
import numpy as np
import pickle
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            project_root = os.path.dirname(current_dir)
            model_path = os.path.join(project_root, 'heart_disease_classification', 'model', 'log_reg_model.pkl')
            
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            features = [
                data['age'],
                data['sex'], 
                data['cp'],
                data['trestbps'],
                data['chol'],
                data['fbs'],
                data['restecg'],
                data['thalach'],
                data['exang'],
                data['oldpeak'],
                data['slope'],
                data['ca'],
                data['thal']
            ]
            
            features_array = np.array([features])
            
            prediction = model.predict(features_array)[0]
            probabilities = model.predict_proba(features_array)[0]
            
            response = {
                'prediction': 'High Risk' if prediction == 1 else 'Low Risk',
                'confidence': round(max(probabilities) * 100, 2),
                'disease_probability': round(probabilities[1] * 100, 2),
                'healthy_probability': round(probabilities[0] * 100, 2),
                'success': True
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            error_response = {
                'error': str(e),
                'success': False
            }
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()