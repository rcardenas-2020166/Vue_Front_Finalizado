<template>
    <div class="d-flex justify-content-center mt-5">
        <router-link :to="{ name : 'crear-categoria' }" class="btn btn-success ms-3 me-3">
            <i class="fa fa-circle-plus"></i>
            Nueva Categoria
        </router-link>

        <input class="max-width form-control ms-3 me-3" type="text" v-model="search" placeholder="Buscar Categoria..." />
    </div>
    <div class="me-5 ms-5">
        <table class="table table-hover table-bordered table-striped mt-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">
                        Nombre &nbsp;
                    </th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(categoria, index) in filteredData" :key="categoria.codigoCategoria">
                    <th scope="row">{{ index + 1 }}</th>
                    <td> {{ categoria.nombreCategoria }}</td>
                    <td>
                        <router-link :to="{path : `editar-categoria/${ categoria.codigoCategoria }`}" class="btn btn-warning  ms-2 me-2">
                            <i class="fa fa-pencil"></i>
                        </router-link>
                        <router-link to="/" class="btn btn-danger ms-2 me-2">
                                <i class="fa fa-trash"></i>
                        </router-link>
                    </td>
                </tr>
                <tr v-if="filteredData.length === 0">
                    <th style="text-align: center" colspan="3">  
                        Sin Resultados 
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    let URI = process.env.VUE_APP_API;

    export default {
        data()
        {
            return{
                categorias : [],
                search : '',
                loader: false
            }
        },

        mounted()
        {
            this.getCategorias();
        },

        computed : 
        {
            filteredData()
            {
                return this.categorias.filter(item => {
                    return item.nombreCategoria.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },

        methods : 
        {
            async getCategorias()
            {
                try
                {
                    this.loader = true;
                    const data = await fetch(`${ URI }/getCategorias`)
                    .then( resp => resp.json())
                    .finally(()=>{ 
                        setTimeout(() => {
                            this.loader = false;
                        }, 1000)
                    })

                    this.categorias = data;
                }
                catch(error)
                {
                    console.log(error)
                }
            }
        }
    }
</script>

<style scope>
    .max-width
    {
        width: 75%;
    }
</style>