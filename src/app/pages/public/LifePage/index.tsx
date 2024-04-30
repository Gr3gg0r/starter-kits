import { Button, Result, Table } from 'antd';
import { useNavigate } from 'react-router';
import { useListLivesQuery } from '../../../api';
import LoadingElement from '../../../components/LoadingElement';
import BasicLayout from '../../../layouts/BasicLayout';

const TableData = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useListLivesQuery();

    if (loading) {
        return <LoadingElement />;
    }

    const goBack = () => navigate(-1);

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

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            render: text => new Date(text).toLocaleDateString(),
        },
    ];

    // Data mapping
    const dataSource = data?.listLives.map((item, index) => ({
        key: index + 1,
        id: item.id,
        fullName: item.fullName,
        birthday: item.birthday,
        description: item.description,
        firstName: item.firstName,
        lastName: item.lastName,
        hobbies: item.hobbies,
    }));

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            onRow={record => ({
                onClick: () => navigate(`/life/${record.id}`),
            })}
        />
    );
};

const LifePage = () => (
    <BasicLayout>
        <TableData />
    </BasicLayout>
);

export default LifePage;
