<template>
  <div class="me-5 ms-5 mt-5">
        <div class="row mt-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <i class="fa fa-plus"></i> 
                            Agregar Categoria
                        </h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="createCategoria">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <div class="form-group">
                                        <label>Nombre</label>
                                        <input type="text" v-model="categoria.nombreCategoria" class="form-control">
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center col-12 mt-3">
                                    <button type="submit" class="btn btn-primary ms-3 me-3">
                                        <i class="fa fa-floppy-disk"></i>
                                        Guardar
                                    </button>
                                    <router-link :to="{name : 'lista-categorias'}" type="submit" class="btn btn-secondary ms-3 me-3">
                                        <i class="fa fa-arrow-left"></i>
                                        Regresar
                                    </router-link>
                                </div>
                            </div>                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let URI = process.env.VUE_APP_API;
    export default {
        data()
        {
            return{
                categoria : 
                {
                    nombreCategoria : ''
                }
            }
        },
        methods :
        {
            async createCategoria()
            {
                try
                {
                    const data = await fetch(`${ URI }/createCategoria`,{
                        method : 'POST',
                        body: JSON.stringify({
                            nombreCategoria: this.categoria.nombreCategoria
                        }),
                        headers: 
                        {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(resp => resp.json());

                    if(data.Code === 200)
                    {
                        this.$swal(
                            'Registro Agregado!',
                            data.message,
                            'success'
                        )
                        this.$router.push({ name : 'lista-categorias'});
                    }
                    else
                    {
                        this.$swal(
                            'Opppps!',
                            data.message,
                            'error'
                        )
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
        
    }
</script>

<style>

</style>