import { Button, Card, Col, List, Result, Row, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useGetLifeQuery } from '../../../../api';
import LoadingElement from '../../../../components/LoadingElement';
import BasicLayout from '../../../../layouts/BasicLayout';

const DisplayComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useGetLifeQuery({ variables: { id } });

    const goBack = () => navigate(-1);

    if (loading) {
        return <LoadingElement />;
    }

    if (error) {
        if (!error.networkError) {
            throw error;
        }

        const statusCode = error.networkError && (error.networkError as { statusCode: number }).statusCode;

        if (statusCode >= 500) {
            throw error;
        }

        return (
            <Result
                extra={
                    <Button onClick={goBack} type="primary">
                        Back Home
                    </Button>
                }
                status="404"
                subTitle="Life not found, Contact support if you need help"
                title={`${statusCode} Not Found`}
            />
        );
    }

    const { getLife } = data;

    return (
        <Row justify="center" style={{ marginTop: 20 }}>
            <Col lg={10} md={12} sm={18} xl={8} xs={24}>
                <Card
                    actions={[
                        <Button onClick={goBack} type="primary">
                            Go Back
                        </Button>,
                    ]}
                    bordered={false}
                    title={<Typography.Title level={2}>{getLife.fullName}</Typography.Title>}
                >
                    <Typography.Paragraph>
                        <strong>Database ID:</strong> {getLife.id}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <strong>Birthday:</strong> {new Date(getLife.birthday).toLocaleDateString()}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <strong>Description:</strong> {getLife.description}
                    </Typography.Paragraph>
                    <Typography>
                        <strong>Hobbies:</strong>
                        <List
                            dataSource={getLife.hobbies}
                            grid={{ gutter: 16, column: 1 }}
                            renderItem={item => (
                                <List.Item style={{ margin: '4px' }}>
                                    <Card bodyStyle={{ padding: '10px' }} hoverable>
                                        {item}
                                    </Card>
                                </List.Item>
                            )}
                            style={{ marginTop: '10px' }}
                        />
                    </Typography>
                </Card>
            </Col>
        </Row>
    );
};

const LifeViewPage = () => (
    <BasicLayout>
        <DisplayComponent />
    </BasicLayout>
);

export default LifeViewPage;
