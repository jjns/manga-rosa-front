import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Alert, Button, Card, Table, Modal, Form } from 'react-bootstrap';

function Registros() {
  const [registers, setRegisters] = useState([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [selectedRegister, setSelectedRegister] = useState(null)

  const handleCloseModal = () => setShowEmployeeModal(false);
  function handleShowModal(register) {
    setSelectedRegister(register)
    setShowEmployeeModal(true)
  };

  function validateEmployee(register, status) {
    api
      .patch(`/${register?.id}/validar`, { "status": status })
      .catch((err) => {
        console.error("Algo deu errado!");
      });
  }

  useEffect(() => {
    api
      .get("/registros")
      .then((response) => setRegisters(response.data))
      .catch(() => {
        console.error("Algo deu errado!");
      });
  }, []);

  return (
    <Card className="text-center">
      <h1 style={{ marginTop: '2rem' }}>Registros</h1>

      <Table style={{ width: '40rem', alignSelf: 'center', marginTop: '2rem' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {registers.map(register => {
            return (
              <tr key={register?.id}>
                <td>
                  <Button 
                    id={register?.id}
                    style={{ width: '100%', height: '100%' }} 
                    variant='outline-dark'
                    onClick={handleShowModal.bind(this, register)}
                  >
                    {register?.name}
                  </Button>
                </td>
                <td style={{ width: '2rem' }}>{register?.status 
                      ? <Alert size="sm" variant='success'>Validado</Alert> 
                      : <Alert variant='warning'>Não Validado</Alert> }
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      
      <Card style={{ width: '40rem', alignSelf: 'center', marginBottom: '2rem' }}>
        <Button >Adicionar Colaborador</Button>
      </Card>

      <Modal show={showEmployeeModal} onHide={handleCloseModal} register={selectedRegister}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRegister?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome" value={selectedRegister?.name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={selectedRegister?.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" placeholder="CPF" value={selectedRegister?.cpf}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="celphone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" placeholder="Telefone" value={selectedRegister?.celphone}/>
            </Form.Group>
            <div>
              <Form.Label>Conhecimentos</Form.Label>
              <br/>
              <Form.Check
                label="Git"
                name="group1"
                type="checkbox"
                value="Git"
              />
              <Form.Check
                label="PHP"
                name="group1"
                type="checkbox"
                value="PHP"
              />
              <Form.Check
                label="React"
                name="group1"
                type="checkbox"
                value="React"
              />
              <Form.Check
                label="Banco de Dados"
                name="group1"
                type="checkbox"
                value="Database"
              />
              <Form.Check
                label="Git"
                name="group1"
                type="checkbox"
                value="NodeJs"
              />
              <Form.Check
                label="Git"
                name="group1"
                type="checkbox"
                value="Typescript"
              />
              <Form.Check
                label="DevOps"
                name="group1"
                type="checkbox"
                value="DevOps"
              />
              <br/>
              <Form.Text>Selecione apenas 3 conhecimentos</Form.Text>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={validateEmployee(selectedRegister, true)}>
            Aprovar
          </Button>
        </Modal.Footer>
      </Modal>
      
    </Card>
  );
}

export default Registros;
