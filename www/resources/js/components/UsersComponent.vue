<template>
    <div>
        <form @submit.prevent="editarNota(user)" v-if="modoEditar">
            <h3>Editar nota</h3>
            <input type="text" class="form-control mb-2"
                   placeholder="Nombre de la nota" v-model="user.email">
            <input type="text" class="form-control mb-2"
                   placeholder="Descripción de la nota" v-model="user.created_at">
            <button class="btn btn-warning" type="submit">Editar</button>
            <button class="btn btn-danger" type="submit"
                    @click="cancelarEdicion">Cancelar
            </button>
        </form>
        <form @submit.prevent="agregar" v-else>
            <h3>Agregar nota</h3>
            <input type="text" class="form-control mb-2"
                   placeholder="Nombre de la nota" v-model="user.email">
            <input type="text" class="form-control mb-2"
                   placeholder="Descripción de la nota" v-model="user.created_at">
            <button class="btn btn-primary" type="submit">Agregar</button>
        </form>
        <hr>
        <h3>Lista de notas:</h3>
        <ul class="list-group">
            <li class="list-group-item"
                v-for="(item, index) in users" :key="index">
          <span class="badge badge-primary float-right">
            {{item.updated_at}}
          </span>
                <p>{{item.email}}</p>
                <p>{{item.created_at}}</p>
                <p>
                    <button class="btn btn-warning btn-sm"
                            @click="editarFormulario(item)">Editar
                    </button>
                    <button class="btn btn-danger btn-sm"
                            @click="eliminarNota(item, index)">Eliminar
                    </button>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                users: [],
                modoEditar: false,
                user: {id: '', email: '', created_at: ''}
            }
        },
        created()
        {
            axios.get('/user').then(res =>
            {
                this.users = res.data;
            })
        },
        methods: {
            agregar()
            {
                if (this.user.email.trim() === '' || this.user.created_at.trim() === '')
                {
                    alert('Debes completar todos los campos antes de guardar');
                    return;
                }
                const notaNueva = this.user;
                this.user = {email: '', created_at: ''};
                axios.post('/user', notaNueva)
                    .then((res) =>
                    {
                        const notaServidor = res.data;
                        this.users.push(notaServidor);
                    })
            },
            editarFormulario(item)
            {
                waitingDialog.show();
                this.user.email = item.email;
                this.user.created_at = item.created_at;
                this.user.id = item.id;
                this.modoEditar = true;
                setTimeout(function () { waitingDialog.hide(); }, 1000);
            },
            editarNota(user)
            {
                const params = {email: user.email, created_at: user.created_at};
                waitingDialog.show();
                axios.put(`/user/${user.id}`, params)
                    .then(res =>
                    {
                        waitingDialog.hide();
                        this.modoEditar = false;
                        const index = this.users.findIndex(item => item.id === user.id);
                        this.users[index] = res.data;

                    }).catch(function (error)
                {
                    waitingDialog.hide();
                    console.log(error);
                    az.alert.error('Error no controlado', error);
                })
            },
            eliminarNota(user, index)
            {
                waitingDialog.show();

                const confirmacion = confirm(`Eliminar usuario ${user.email}`);
                if (confirmacion)
                {
                    axios.delete(`/user/${user.id}`)
                        .then(() =>
                        {
                            this.users.splice(index, 1);
                        })
                }
                waitingDialog.hide();

            },
            cancelarEdicion()
            {
                this.modoEditar = false;
                this.user = {email: '', created_at: ''};
            }
        }
    }
</script>
