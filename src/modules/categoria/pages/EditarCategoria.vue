<template>
  <div class="me-5 ms-5 mt-5">
        <div class="row mt-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <i class="fa fa-pencil"></i> 
                            Editar Categoria
                        </h4>
                    </div>
                    <div v-if="categoria" class="card-body">
                        <form @submit.prevent="updateCategoria">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <div class="col-12 mb-2">
                                        <div class="form-group">
                                            <label>Código</label>
                                            <input type="number" disabled :value="categoria.codigoCategoria" class="center form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Nombre</label>
                                        <input type="text" v-model="categoria.nombreCategoria"  class="form-control">
                                    </div>
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-secondary ms-2 me-2">
                                        <i class="fa fa-rotate"></i>
                                        Modificar
                                    </button>
                                    <router-link :to="{name:'lista-categorias'}" type="submit" class="btn btn-primary ms-2 me-2">
                                        <i class="fa fa-arrow-left"></i>
                                            Regresar
                                    </router-link>
                                </div>
                            </div>                        
                        </form>
                    </div>
                        <div v-if="!categoria" class="card-body">
                            <div class="alert alert-danger" role="alert">
                                <i class="fa fa-bug"></i> &nbsp;
                                Registro No Encontrado
                            </div>
                            <router-link :to="{name:'lista-categorias'}" type="submit" class="btn btn-primary ms-2 me-2">
                                            <i class="fa fa-arrow-left"></i>
                                                Regresar
                            </router-link>
                        </div>
                    
                </div>
            </div>
        </div>
    </div>

    <Loader v-if="loader" />
</template>

<script>

    import { defineAsyncComponent } from 'vue';

    let URI = process.env.VUE_APP_API;
    export default {
        props : 
        {
            id : {
                type : Number,
                required : true
            }
        },
        data () 
        {
            return{
                categoria : null,
                loader : false,
            }
        },
        components : 
        {
            Loader : defineAsyncComponent( () => import(/*webPackChunkName : "LoaderComponent"*/'@/modules/shared/components/Loader') )
        },
        mounted()
        {
            this.getCategoria();
        },
        methods :
        {
            async getCategoria()
            {
                try 
                {
                    this.loader = true;
                    const data = await fetch(`${ URI }/getCategoria/${ this.id }`)
                        .then(resp => resp.json())
                        .finally(() => {
                            setTimeout(() => {
                                this.loader = false;
                            }, 1000)
                        })

                    if (data.Code === 200)
                    {
                        this.categoria = data.datos[0]
                    }
                    else if(data.Code === 400)
                    {
                        this.categoria = null;
                    }
                } catch (error) 
                {
                    console.log(error)
                }
            },

            async updateCategoria()
            {
                try 
                {
                    const data = await fetch(`${ URI }/updateCategoria/${ this.id }`,
                    {
                        method : 'PUT',
                        body: JSON.stringify({
                        nombreCategoria: this.categoria.nombreCategoria,
                        }),
                    
                        // Adding headers to the request
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(resp => resp.json());

                    if (data.Code === 200)
                    {
                        this.$swal(
                        'Registro Modificado!',
                        data.message,
                        'success');
                        this.$router.push({name : 'lista-categorias'})
                    }
                    else
                    {
                        this.$swal(
                        'Opppsss!',
                        data.message,
                        'error');
                    }
                } catch (error) 
                {
                    console.log(error)
                }
            }

        },
        watch :
        {
            id()
            {
                this.getCategoria();
            }
        }
    }
</script>

<style>
    .center
        {
            text-align: center;
        }
</style>