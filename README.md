# SHAP-AID Project

A web application for diabetes risk prediction using machine learning and SHAP values for explainability.

## Project Structure

- **Frontend**: Next.js (Root directory) - Provides the user interface for inputting patient data and visualizing risk.
- **Backend**: Python FastAPI (`backend/` directory) - Handles the ML model prediction and SHAP explanations.

## Prerequisites

Before setting up the project, ensure you have the following installed on your new PC:

- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [Python](https://www.python.org/) (Version 3.8 or higher)
- [Git](https://git-scm.com/)

## Setup Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Shap-Project
```

### 2. Backend Setup

The backend handles the machine learning inference.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3.  Activate the virtual environment:
    - **Windows (Command Prompt):**
        ```cmd
        venv\Scripts\activate
        ```
    - **Windows (PowerShell):**
        ```powershell
        .\venv\Scripts\Activate
        ```
    - **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

4.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

5.  Start the backend server:
    ```bash
    python main.py
    # OR using uvicorn directly
    uvicorn main:app --reload
    ```
    The backend API will be running at `http://localhost:8000`.

### 3. Frontend Setup

The frontend is a Next.js application located in the root directory.

1.  Open a **new terminal** window (keep the backend running in the first one).

2.  Ensure you are in the project root directory (if you were in backend, go back):
    ```bash
    cd ..
    # Verify you see package.json
    ls
    ```

3.  Install dependencies:
    ```bash
    npm install
    # or if you use yarn/pnpm
    yarn install
    pnpm install
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000`.

## Usage

1.  Open your browser and navigate to `http://localhost:3000`.
2.  Enter the patient details in the form.
3.  Click "Predict Risk".
4.  View the risk assessment and SHAP value explanations.

## Troubleshooting

-   **Backend Import Errors**: Ensure your virtual environment is activated before running the server.
-   **Frontend Connection Refused**: Make sure the backend server consists running on port 8000.
-   **Model Not Found**: The backend is configured to automatically train a model if `diabetes_model.pkl` is missing. Just run the backend and it will handle it.
