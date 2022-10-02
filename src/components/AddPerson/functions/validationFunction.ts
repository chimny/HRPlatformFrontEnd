type availableFields = 'name' | 'surName' | 'position' | 'salary'

export type response = {
    error: boolean,
    typeError: string | ''
}


export const validationFunction = (field: availableFields, value: string | number): response => {


    const safeValue = {
        error: false,
        typeError: ''
    }


    switch (field) {
        case 'name':
            if (typeof value === "string" && value.length === 0) {
                return {
                    error: true,
                    typeError: 'name can\'t be empty!'
                }
            }
            return safeValue;


        case 'surName':
            if (typeof value === "string" && value.length === 0) {
                return {
                    error: true,
                    typeError: 'surname can\'t be empty!'
                }
            }
            return safeValue;



        case 'position':
            if (typeof value === "string" && value.length === 0) {
                return {
                    error: true,
                    typeError: 'please choose the position!'
                }
            }
            return safeValue;



        case 'salary':
            if (value === '') {
                return {
                    error: true,
                    typeError: 'please provide salary value'
                }
            }
            return safeValue;



    }


    return safeValue

}