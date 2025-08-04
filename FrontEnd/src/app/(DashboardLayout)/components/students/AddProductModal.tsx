import {
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Card,
    Grid2 as Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Autocomplete,
    Typography,
    LinearProgress,
    FormHelperText,
    Chip,
    InputAdornment,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { ClearButton, ActionButton } from 'components/common/Buttons/ActionButtons';
import axiosInstance from 'helpers/AxiosInstance';
import { openSuccessGlobalSnackbar, openErrorGlobalSnackbar } from 'redux-state/globalSnackbar/actions';
import { useDispatch } from 'redux-state/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { acceptExportNameExpression, acceptProductsExpression } from 'constants/Regex';
import { useGet } from 'hooks';
import { useCallback, useState } from 'react';
import { stringToArrayHandler } from 'helpers/arrayToStringListHandler';
import { CreateProduct, ProductsAndSectionsForProducts, ProductsForTable } from 'models/Products/Products';
import { DisplayName } from 'models/common/DisplayName';
import { BasicResponse } from 'models/common/Response';
import { capitalize, size } from 'lodash';
interface IDeactivateModal {
    refreshTable: () => void;
    handleClose: () => void;
    open: boolean;
}

const AddProductModal = ({ handleClose, open, refreshTable }: IDeactivateModal) => {
    const [existingProduct, setExistingProduct] = useState(false);
    const dispatch = useDispatch();
    const {
        data: options,
        isFetching,
        isLoading,
    } = useGet<ProductsAndSectionsForProducts[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productSections/names`,
        apiLabel: 'getProductsSectionsNames',
    });

    const {
        data: products,
        error,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts,
    } = useGet<DisplayName[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/productTypes/names`,
        apiLabel: 'getAllProductTypes',
    });

    const {
        data: personTypes,
        isFetching: isFetchingPersons,
        isLoading: isLoadingPersons,
    } = useGet<DisplayName[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/persontypes/names`,
        apiLabel: 'getAllPersonTypes',
    });

    const { data: names } = useGet<string[]>({
        url: `${process.env.REACT_APP_EROTAS_CONSOLE_API}/products/names`,
        apiLabel: 'getAllProductNames',
    });

    const addRow = async (newProduct: CreateProduct) => {
        const response = await axiosInstance.post<BasicResponse>(`${process.env.REACT_APP_EROTAS_CONSOLE_API}/products`, newProduct);
        if (response.status === 200) {
            dispatch(openSuccessGlobalSnackbar({ message: response.data.message }));
        } else {
            dispatch(openErrorGlobalSnackbar({ message: response?.data.message ? response?.data.message : `An error has occured` }));
        }
        refreshTable();
        handleClose();
    };

    const OptionRender = useCallback((props: any, option: ProductsAndSectionsForProducts) => {
        const { key, ...optionProps } = props;
        return (
            <Box component="li" key={`${option.name}_${option.defaultClientName}`} {...optionProps}>
                <Typography>
                    {option.name} ({option.defaultClientName})
                </Typography>
            </Box>
        );
    }, []);

    const ProductOptionRender = useCallback((props: any, option: DisplayName) => {
        const { key, ...optionProps } = props;
        return (
            <Box component="li" key={`${option.name}_${option.displayName}_product`} {...optionProps}>
                <Typography>{option.displayName}</Typography>
            </Box>
        );
    }, []);

    const PersonOptionRender = useCallback((props: any, option: DisplayName) => {
        const { key, ...optionProps } = props;
        return (
            <Box component="li" key={`${option.name}_${option.displayName}_person`} {...optionProps}>
                <Typography>{option.displayName}</Typography>
            </Box>
        );
    }, []);

    const checkExistingProduct = async (name: string) => {
        const nameOptions = names ? [...names] : [];
        setExistingProduct(nameOptions.some((product) => product === name));
    };

    return (
        <Dialog
            aria-describedby="alert-dialog-description"
            aria-labelledby="alert-dialog-title"
            data-testid="AddProductModal"
            fullWidth
            maxWidth="lg"
            onClose={handleClose}
            open={open}
            scroll="paper"
        >
            <DialogTitle>Create New Product</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        productSection: { name: '', defaultClientName: '' },
                        name: '',
                        defaultClientName: '',
                        objectivity: 'SUBJECTIVE',
                        productTypes: [],
                        personTypes: [],
                        synonyms: '',
                    }}
                    onSubmit={async (values, { resetForm, setStatus, setSubmitting }): Promise<void> => {
                        const sendProduct = { ...values, synonyms: stringToArrayHandler(values.synonyms) };
                        try {
                            // NOTE: Make API request
                            addRow(sendProduct);
                            resetForm();
                            setStatus({ success: true });
                            setSubmitting(false);
                        } catch (err) {
                            console.error(err);
                            setStatus({ success: false });
                            setSubmitting(false);
                        }
                    }}
                    validationSchema={Yup.object().shape({
                        productSection: Yup.object().shape({ name: Yup.string(), defaultClientName: Yup.string() }).required(),
                        id: Yup.number(),
                        name: Yup.string().max(255).matches(acceptProductsExpression, 'Invalid charaters'),
                        defaultClientName: Yup.string().max(255).matches(acceptExportNameExpression, 'Invalid charaters'),
                        tier: Yup.number().max(3).min(1),
                        objectivity: Yup.mixed().oneOf(['SUBJECTIVE', 'OBJECTIVE']),
                        productTypes: Yup.array()
                            .of(Yup.object().shape({ name: Yup.string(), displayName: Yup.string() }))
                            .required(),
                        personTypes: Yup.array()
                            .of(Yup.object().shape({ name: Yup.string(), displayName: Yup.string() }))
                            .required(),
                        synonyms: Yup.string(),
                        rolloutToAll: Yup.boolean().required(),
                    })}
                >
                    {({ dirty, errors, handleBlur, handleChange, handleSubmit, isValid, setFieldValue, touched, values }): JSX.Element => (
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <Box sx={{ p: 3 }}>
                                    <Grid container direction="column" spacing={3}>
                                        <Grid>
                                            <TextField
                                                error={existingProduct || Boolean(touched.name && errors.name)}
                                                fullWidth
                                                helperText={existingProduct ? 'Product name already exists' : touched.name && errors.name}
                                                label="Product Name"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={(value) => {
                                                    checkExistingProduct(value.target.value);
                                                    return handleChange(value);
                                                }}
                                                required
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            'data-testid': 'addProductModalName',
                                                        },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Chip
                                                                    component="a"
                                                                    href="https://erotasai.atlassian.net/wiki/spaces/KB/pages/2948399314/Allowed+Characters+in+our+Registry"
                                                                    label="Best Practices"
                                                                    sx={{ cursor: 'pointer' }}
                                                                    target="_blank"
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                value={values.name}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid>
                                            <TextField
                                                error={Boolean(touched.defaultClientName && errors.defaultClientName)}
                                                fullWidth
                                                helperText={touched.defaultClientName && errors.defaultClientName}
                                                label="Default Export Name"
                                                name="defaultClientName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            'data-testid': 'addProductModalDefaultClientName',
                                                        },
                                                    },
                                                }}
                                                value={values.defaultClientName}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid>
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                getOptionLabel={(option: any) => `${option.name} (${option.defaultClientName})`}
                                                loading={isLoading || isFetching}
                                                noOptionsText="No Products Available"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => setFieldValue('productSection', value)}
                                                options={options || []}
                                                renderInput={(params) =>
                                                    isLoading || isFetching ? (
                                                        <LinearProgress />
                                                    ) : (
                                                        <TextField {...params} label="Product Section" value={values.productSection} />
                                                    )
                                                }
                                                renderOption={OptionRender}
                                            />
                                        </Grid>

                                        <Grid>
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                getOptionLabel={(option: any) => `${option.displayName}`}
                                                loading={isLoadingProducts || isFetchingProducts}
                                                multiple
                                                noOptionsText="No Product Types Available"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => setFieldValue('productTypes', value)}
                                                options={products || []}
                                                renderInput={(params) =>
                                                    isLoadingProducts || isFetchingProducts ? (
                                                        <LinearProgress />
                                                    ) : (
                                                        <TextField {...params} label="Product Type Section" value={values.productTypes} />
                                                    )
                                                }
                                                renderOption={ProductOptionRender}
                                            />
                                        </Grid>
                                        <Grid>
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                getOptionLabel={(option: any) => `${option.displayName}`}
                                                loading={isLoadingPersons || isFetchingPersons}
                                                multiple
                                                noOptionsText="No Person Types Available"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => setFieldValue('personTypes', value)}
                                                options={personTypes || []}
                                                renderInput={(params) =>
                                                    isLoadingPersons || isFetchingPersons ? (
                                                        <LinearProgress />
                                                    ) : (
                                                        <TextField {...params} label="Person Type Section" value={values.personTypes} />
                                                    )
                                                }
                                                renderOption={PersonOptionRender}
                                            />
                                        </Grid>
                                        <Grid>
                                            <TextField
                                                error={Boolean(touched.synonyms && errors.synonyms)}
                                                fullWidth
                                                helperText={touched.synonyms && errors.synonyms}
                                                label="Synonyms (EN-US)"
                                                name="synonyms"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            'data-testid': 'addProductModalSynonyms',
                                                        },
                                                    },
                                                }}
                                                value={values.synonyms}
                                                variant="outlined"
                                            />
                                            <FormHelperText id="synonym-helper-text">Separate values with comma</FormHelperText>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ mt: 2 }}>
                                        <Grid container justifyContent="space-between">
                                            <Grid>
                                                <ClearButton data-testid="CancelAddProductModal" onClick={handleClose}>
                                                    Cancel
                                                </ClearButton>
                                            </Grid>
                                            <Grid>
                                                <ActionButton
                                                    data-testid="SubmitAddProductModal"
                                                    disabled={!(isValid && dirty) && !existingProduct}
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    APPLY
                                                </ActionButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Card>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductModal;
