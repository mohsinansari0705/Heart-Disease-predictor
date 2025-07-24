import numpy as np
import pickle
import json
import os

def handler(request):
    try:
        model_path = os.path.join(os.path.dirname(__file__), 'model', 'log_reg_model.pkl')

        if not os.path.exists(model_path):
            return {
                "statusCode": 500,
                "body": json.dumps({"error": f"Model not found at {model_path}", "success": False}),
                "headers": {"Content-Type": "application/json"}
            }

        with open(model_path, 'rb') as f:
            model = pickle.load(f)

        body = request.get_json()
        features = [
            float(body['age']),
            float(body['sex']),
            float(body['cp']),
            float(body['trestbps']),
            float(body['chol']),
            float(body['fbs']),
            float(body['restecg']),
            float(body['thalach']),
            float(body['exang']),
            float(body['oldpeak']),
            float(body['slope']),
            float(body['ca']),
            float(body['thal'])
        ]

        features_array = np.array([features])
        prediction = model.predict(features_array)[0]
        probabilities = model.predict_proba(features_array)[0]

        return {
            "statusCode": 200,
            "body": json.dumps({
                "prediction": "High Risk" if prediction == 1 else "Low Risk",
                "confidence": round(max(probabilities) * 100, 2),
                "disease_probability": round(probabilities[1] * 100, 2),
                "healthy_probability": round(probabilities[0] * 100, 2),
                "success": True
            }),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e), "success": False}),
            "headers": {"Content-Type": "application/json"}
        }