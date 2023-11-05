export default interface IClinic {
    city: {
        S: string
    },
    clinicId: {
        N: string
    },
    coordinate: {
        M: {
            latitude: {
                N: string 
            },
            longitude: {
                N: string 
            }
        }
    },
    dentists: {
        N: string
    },
    owner: {
        S: string
    },
    address: {
        S: string
    },
    openinghours: { 
        M: {
            friday: {
                S: string
            },
            thursday: {
                S: string
            },
            wednesday: {
                S: string
            },
            tuesday: {
                S: string
            },
            monday: {
                S: string
            }
        }
    },
    name: {
        S: string
    }
}
