import React, {useState} from 'react';
import {Container, Table, Form, Row, Col} from 'react-bootstrap';
import {timeAgo} from "../services/Utils";

const StatTable = ({data}) => {
    const [filterAction, setFilterAction] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const handleFilterActionChange = (e) => setFilterAction(e.target.value);
    const handleFilterStatusChange = (e) => setFilterStatus(e.target.value);

    const filteredData = data.filter(item => {
        return (
            (filterAction === '' || item.action.toLowerCase().includes(filterAction.toLowerCase())) &&
            (filterStatus === '' || item.status.toLowerCase().includes(filterStatus.toLowerCase()))
        );
    });

    return (
        <Container>
            <Row className="mt-4">
                <Col md={6}>
                    <Form.Group controlId="filterAction">
                        <Form.Label>Filter by Action</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter action"
                            value={filterAction}
                            onChange={handleFilterActionChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="filterStatus">
                        <Form.Label>Filter by Status</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter status"
                            value={filterStatus}
                            onChange={handleFilterStatusChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                <tr>
                    <th>Action</th>
                    <th>Status</th>
                    <th>DateTime</th>
                    <th>Error Message</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.action}</td>
                            <td>{item.status}</td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>{item.errorMessage}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );

};

export default StatTable;