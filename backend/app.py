# backend/app.py
import pg8000
from flask import Flask, jsonify, request

app = Flask(__name__)

# Credenciales de acceso a tu PostgreSQL local
DB_USER = 'postgres'
DB_PASSWORD = 'root'  # <-- Asegúrate de que esta sea tu clave real de pgAdmin
DB_HOST = 'localhost'
DB_PORT = 5432
DB_NAME = 'taskcampus'

# Configuración de CORS manual para permitir comunicación fluida con Vite (puerto 8000)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def get_db_connection():
    return pg8000.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME
    )

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, titulo, descripcion, asignatura, fecha_entrega, prioridad, estado, activo FROM public.tareas ORDER BY id ASC")
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        
        tasks = []
        for row in rows:
            task = dict(zip(columns, row))
            task['fecha_entrega'] = str(task['fecha_entrega'])  # Compatibilidad con input date HTML
            tasks.append(task)
            
        return jsonify(tasks)
    finally:
        cursor.close()
        conn.close()

@app.route('/tasks', methods=['POST'])
def create_task():
    payload = request.get_json()
    conn = get_db_connection()
    conn.autocommit = True
    cursor = conn.cursor()
    try:
        query = """
            INSERT INTO public.tareas (titulo, descripcion, asignatura, fecha_entrega, prioridad, estado, activo)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, titulo, descripcion, asignatura, fecha_entrega, prioridad, estado, activo
        """
        params = [
            payload.get('titulo'),
            payload.get('descripcion', ''),
            payload.get('asignatura'),
            payload.get('fecha_entrega'),
            payload.get('prioridad', 'media'),
            payload.get('estado', 'pendiente'),
            payload.get('activo', True)
        ]
        cursor.execute(query, params)
        row = cursor.fetchone()
        columns = [col[0] for col in cursor.description]
        
        new_task = dict(zip(columns, row))
        new_task['fecha_entrega'] = str(new_task['fecha_entrega'])
        return jsonify(new_task), 201
    finally:
        cursor.close()
        conn.close()

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    payload = request.get_json()
    conn = get_db_connection()
    conn.autocommit = True
    cursor = conn.cursor()
    try:
        query = """
            UPDATE public.tareas 
            SET titulo=%s, descripcion=%s, asignatura=%s, fecha_entrega=%s, prioridad=%s, estado=%s, activo=%s
            WHERE id=%s
            RETURNING id, titulo, descripcion, asignatura, fecha_entrega, prioridad, estado, activo
        """
        params = [
            payload.get('titulo'),
            payload.get('descripcion'),
            payload.get('asignatura'),
            payload.get('fecha_entrega'),
            payload.get('prioridad'),
            payload.get('estado'),
            payload.get('activo'),
            task_id
        ]
        cursor.execute(query, params)
        row = cursor.fetchone()
        
        if not row:
            return jsonify({"error": "Registro no encontrado"}), 404
            
        columns = [col[0] for col in cursor.description]
        updated_task = dict(zip(columns, row))
        updated_task['fecha_entrega'] = str(updated_task['fecha_entrega'])
        return jsonify(updated_task)
    finally:
        cursor.close()
        conn.close()

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = get_db_connection()
    conn.autocommit = True
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM public.tareas WHERE id=%s", [task_id])
        if cursor.rowcount == 0:
            return jsonify({"error": "Registro no encontrado"}), 404
        return jsonify({"result": True})
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(port=5000, debug=True)